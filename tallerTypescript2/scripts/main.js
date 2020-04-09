import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var studentTbody = document.getElementById('student');
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBoxI = document.getElementById("search-boxI");
var inputSearchBoxF = document.getElementById("search-boxF");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(students) {
    console.log('Desplegando informacion del estudiante');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.nombreDato + "</td>\n                           <td>" + student.infoDato + "</td>";
        studentTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
function applyFilterByCredits() {
    var inicio = inputSearchBoxI.valueAsNumber;
    var fin = inputSearchBoxF.valueAsNumber;
    inicio = (inicio == null) ? 0 : inicio;
    fin = (fin == null) ? 100 : fin;
    if (inicio > fin) {
        alert('El rango no es valido. \nEl valor desde debe ser más grande que el valor hasta del rango');
        return;
    }
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCreditsRange(inicio, fin, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCreditsRange(desde, hasta, courses) {
    return courses.filter(function (c) { return (c.credits >= desde && c.credits <= hasta); });
}
