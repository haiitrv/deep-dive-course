import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { COURSES } from "../db-data";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  courses = COURSES;

  title = COURSES[0].description;

  price = 9.99;

  startDate = new Date(2000, 0, 1);

  course = COURSES[0];

  @ViewChild("cardRef")
  card: CourseCardComponent;

  @ViewChild("containerRef")
  containerDiv: ElementRef;

  @ViewChildren(CourseCardComponent)
  cards: QueryList<CourseCardComponent>;

  constructor() {}

  ngAfterViewInit(): void {
    // console.log("After View Init", this.containerDiv);
    // console.log(this.cards.first);
    this.cards.changes.subscribe((cards) => {
      console.log(cards);
    });
  }

  onCardClicked(course: Course) {
    console.log("App component - click event bubbled...", course);
    console.log("View Child", this.card);
    console.log("Container Div", this.containerDiv);
  }

  onCoursesEdited() {
    this.courses.push({
      id: 1,
      description: "Angular Core Deep Dive",
      iconUrl:
        "https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-core-in-depth-small.png",
      longDescription:
        "A detailed walk-through of the most important part of Angular - the Core and Common modules",
      category: "INTERMEDIATE",
      lessonsCount: 10,
    });
  }
}
