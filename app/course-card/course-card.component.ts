import {
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from "@angular/core";
import { Course } from "../model/course";
import { CourseImageComponent } from "src/course-image/course-image.component";

@Component({
  selector: "course-card",
  templateUrl: "./course-card.component.html",
  styleUrl: "./course-card.component.css",
})
export class CourseCardComponent {
  @Input()
  course: Course;

  @Input()
  noImageTpl: TemplateRef<any>;

  @Input()
  cardIndex: number;

  @Output("courseSelected")
  courseEmitter = new EventEmitter<Course>();

  @ContentChildren(CourseImageComponent, { read: ElementRef })
  images: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit() {}

  ngAfterContentInit() {
    console.log(this.images);
  }

  ngOnInit() {}

  isImageVisible() {
    return this.course && this.course.iconUrl;
  }

  onCourseViewed() {
    this.courseEmitter.emit(this.course);
  }

  cardClasses() {
    if (this.course.category == "BEGINNER") {
      return "beginner";
    }
  }

  cardStyles() {
    return {
      "background-image": "url(" + this.course.iconUrl + ")",
    };
  }
}
