import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "../model/course";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrl: "./course-card.component.css",
})
export class CourseCardComponent {
  @Input()
  course: Course;

  @Input()
  cardIndex: number;

  @Output()
  courseSelected = new EventEmitter<Course>();

  onCourseViewed() {
    console.log("Card Component - Button Clicked");

    this.courseSelected.emit(this.course);
  }

  cardClasses() {
    return {
      beginner: this.course.category == "BEGINNER",
      "course-card": true,
    };
  }
}
