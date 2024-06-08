import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core'

@Directive({
  selector: '[appLazyLoad]',
  standalone: true,
})
export class LazyLoadDirective implements AfterViewInit {
  @Input('appLazyLoad') src: string = ''

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = this.el.nativeElement
            img.src = this.src
            observer.unobserve(img)
          }
        })
      },
      {
        rootMargin: '1000px 0px',
      }
    )

    observer.observe(this.el.nativeElement)
  }
}
