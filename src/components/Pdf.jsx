import { jsPDF } from "jspdf";
    const Pdf = () =>{
    var globalId = document.getElementById("globalId").value;
     var joiningDate = document.getElementById("joiningDate").value;
     var name = document.getElementById("name").value;
     var empId = document.getElementById("empId").value;
     var grade = document.getElementById("grade").value;
     var supervisior = document.getElementById("supervisior").value;
     var doc = new jsPDF()
     doc.text(20, 20, "globalId: " + globalId);
     doc.text(20, 30, "joiningDate: " + joiningDate);
     doc.text(20, 40, "name: " + name);
     doc.text(20, 50, "empId: " + empId);
     doc.text(20, 60, "grade: " + grade);
     doc.text(20, 70, "supervisior: " + supervisior);
     //doc.save("form.pdf") it will save the form
    //window.open(doc.output('bloburl'), '_blank');
    window.open(URL.createObjectURL(doc.output("blob")))
    }
    //const link = document.createElement("a");
    // //link.download = `download.txt`;
    // link.href = "./Pdf.jsx";
    // link.target = "_blank";
    // link.click();

export default Pdf;    