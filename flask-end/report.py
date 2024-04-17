import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages

def generate_report(student_id, response_id, collection):
    document = collection.find_one({"studentId": student_id, "responseId": response_id})
    print(document)
    if document:
        correct = 0
        incorrect = 0
        for question in document["responseData"]:
            if question["selectedKey"] == question["correctKey"]:
                correct += 1
            else:
                incorrect += 1
        
        labels = ["Correct Answers", "Incorrect Answers"]
        sizes = [correct, incorrect]
        colors = ["#ff9999", "#66b3ff"]
        explode = (0.1, 0)
        fig, ax = plt.subplots()
        ax.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', startangle=140)
        ax.set_title("Student {} Response {} Report".format(student_id, response_id))
        ax.legend(labels, loc="best")
        ax.axis('equal')
        ax.legend(loc="best", bbox_to_anchor=(0.3, 0.1))
        pdf_path = f"Report_{student_id}_{response_id}.pdf"
        with PdfPages(pdf_path) as pdf:
            pdf.savefig(fig)

        plt.close()
        return
    else:
        print("No document found for student {} with response {}".format(student_id, response_id))      
        return



