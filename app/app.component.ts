import {
  Component,
  Inject,
  InjectionToken,
  Injector,
  OnInit,
  computed,
  effect,
  signal,
} from "@angular/core";
import { Observable } from "rxjs";
import { Course } from "./model/course";
import { CoursesService } from "./courses/services/courses.service";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from "./config";
import { COURSES } from "src/db-data";
import { CourseTitleComponent } from "./course-title/course-title.component";
import { createCustomElement } from "@angular/elements";
import { CounterService } from "./courses/services/counter.service";

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
  // counter = signal(0);

  derivedCounter = computed(() => {
    const counter = this.counterService.counter();
    return counter * 100;
  });
  // crs = signal({
  //   id: 1,
  //   title: "Angular for beginners",
  // });

  // crses = signal(["Angular for beginners", "Reactive Angular course"]);

  // courses$: Observable<{ payload: Course[] }>;
  courses: Course[] = COURSES;
  coursesTotal = this.courses.length;
  constructor(
    private coursesService: CoursesService,
    @Inject(CONFIG_TOKEN) private config: AppConfig,
    private injector: Injector,
    public counterService: CounterService
  ) {
    effect(
      () => {
        const counterVal = this.counterService.counter();
        const derivedCounterVal = this.derivedCounter();
        console.log(
          `counter: ${counterVal} derived counter: ${derivedCounterVal}`
        );
      },
      {
        manualCleanup: true,
      }
    );
  }

  increment() {
    // this.counter++;
    // this.counter.set(this.counter() + 1);
    // this.crs.set({
    //   id: 1,
    //   title: "Hello",
    // });
    // this.crses.update((val) => [...val, "Deep Dive"]);
    this.counterService.increment();
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
