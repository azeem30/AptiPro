from transformers import T5ForConditionalGeneration, T5Tokenizer
import torch.nn as nn
from datasets import load_dataset
from transformers import Trainer, TrainingArguments

model_name = "t5-base"
model = T5ForConditionalGeneration.from_pretrained(model_name)
tokenizer = T5Tokenizer.from_pretrained(model_name)
dataset = load_dataset("coqa")

# Freezing All Parameters
for param in model.parameters():
    param.requires_grad = False

# Unfreeze last few Encoder layers
for i in range(-3, 0):  
    for param in model.encoder.block[i].parameters():
        param.requires_grad = True

# Unfreeze last few Decoder layers
for i in range(-3, 0):
    for param in model.decoder.block[i].parameters():
        param.requires_grad = True

'''
Optionally Freeze the Attention heads.
for param in model.encoder.final_layer_norm.parameters():
    param.requires_grad = True
for param in model.decoder.final_layer_norm.parameters():
    param.requires_grad = True
'''

# Add our own layers here
class CustomT5(nn.Module):
    def __init__(self, base_model):
        super(CustomT5, self).__init__()
        self.t5 = base_model
        self.custom_layer = nn.Linear(self.t5.config.d_model, 512) 

    def forward(self, input_ids, attention_mask=None, decoder_input_ids=None, decoder_attention_mask=None, labels=None):
        outputs = self.t5(input_ids=input_ids, attention_mask=attention_mask, decoder_input_ids=decoder_input_ids, decoder_attention_mask=decoder_attention_mask, labels=labels)
        sequence_output = outputs.last_hidden_state
        logits = self.custom_layer(sequence_output)
        return logits

model = CustomT5(model)

# Data Preprocessing
def preprocess_function(examples):
    contexts = examples["context"]
    questions = examples["questions"]
    answers = examples["answers"]
    inputs = []
    labels = []
    for i, context in enumerate(contexts):
        for j, question in enumerate(questions[i]):
            input_text = f"Context: {context} Question: {question}"
            target_text = answers[i][j]
            tokenized_input = tokenizer(input_text, truncation=True, padding="max_length", max_length=512)
            tokenized_target = tokenizer(target_text, truncation=True, padding="max_length", max_length=128)
            inputs.append(tokenized_input)
            labels.append(tokenized_target)
    return {
        "input_ids": [x["input_ids"] for x in inputs],
        "attention_mask": [x["attention_mask"] for x in inputs],
        "labels": [x["input_ids"] for x in labels]
    }

tokenized_datasets = dataset.map(preprocess_function, batched=True)

# Tweak this as per requirements
training_args = TrainingArguments(
    per_device_train_batch_size=4,
    per_device_eval_batch_size=4,
    output_dir="./results",
    num_train_epochs=3,
    evaluation_strategy="epoch",
    save_strategy="epoch",
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_datasets["train"],
    eval_dataset=tokenized_datasets["validation"],
    tokenizer=tokenizer,
)

# Train the model
trainer.train()

# Print the Results
results = trainer.evaluate()
print(results)