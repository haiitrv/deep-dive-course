import {
  Component,
  Inject,
  InjectionToken,
  Injector,
  OnInit,
} from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "./model/course";
import { CoursesService } from "./courses/services/courses.service";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from "./config";
import { COURSES } from "src/db-data";
import { CourseTitleComponent } from "./course-title/course-title.component";
import { createCustomElement } from "@angular/elements";

// function coursesServiceProvider(http: HttpClient): CoursesService {
//   return new CoursesService(http);
// }

// export const COURSES_SERVICE = new InjectionToken<CoursesService>(
//   "COURSES_SERVICE"
// );

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [
    // {
    //   // provide: COURSES_SERVICE,
    //   // useFactory: coursesServiceProvider,
    //   // deps: [HttpClient],
    //   provide: CoursesService,
    //   useClass: CoursesService,
    // },
    { provide: CONFIG_TOKEN, useFactory: () => APP_CONFIG },
  ],
})
export class AppComponent implements OnInit {
  // courses$: Observable<{ payload: Course[] }>;
  courses: Course[] = COURSES;
  coursesTotal = this.courses.length;
  constructor(
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private injector: Injector
  ) {
    console.log(config);
  }

  ngOnInit() {
    // this.courses$ = this.coursesService.loadCourses();
    const htmlElement = createCustomElement(CourseTitleComponent, {
      injector: this.injector,
    });
    customElements.define(".course-title", htmlElement);
  }

  save(course: Course) {
    this.coursesService.saveCourses(course).subscribe(() => {
      console.log("Saved");
      this.coursesService.loadCourses();
    });
  }

  onEditCourse() {}
}
