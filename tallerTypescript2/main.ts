import { Course } from './course.js';
import { Student } from './student.js';
import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBoxI: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxI")!;
const inputSearchBoxF: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxF")!;



btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(students: Student[]): void {
  console.log('Desplegando informacion del estudiante');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.nombreDato}</td>
                           <td>${student.infoDato}</td>`;
    studentTbody.appendChild(trElement);
  });
}
 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
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
  let inicio: number = inputSearchBoxI.valueAsNumber;
  let fin = inputSearchBoxF.valueAsNumber;
  inicio = (inicio == null) ? 0 : inicio;
  fin = (fin == null) ? 100 : fin;

  if (inicio > fin) {
    alert('El rango no es valido. \nEl valor desde debe ser más grande que el valor hasta del rango');
    return;
  }

  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCreditsRange(inicio, fin, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCreditsRange(desde: number, hasta: number, courses: Course[]) {
  return courses.filter( c => (c.credits>= desde && c.credits <=hasta));
}