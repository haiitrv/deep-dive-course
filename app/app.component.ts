import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "./model/course";
import { CoursesService } from "./services/courses.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  courses$: Observable<{ payload: Course[] }>;
  courses: Course[];
  constructor(private coursesService: CoursesService) {}

  ngOnInit() {
    this.courses$ = this.coursesService.loadCourses();
  }

  save(course: Course) {
    this.coursesService.saveCourses(course).subscribe(() => {
      console.log("Saved");
      this.coursesService.loadCourses();
    });
  }
}
