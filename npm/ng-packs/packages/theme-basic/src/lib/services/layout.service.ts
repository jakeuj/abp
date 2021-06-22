import { Injectable } from '@angular/core';
import { eThemeBasicComponents } from '../enums';
import { SubscriptionService } from '@abp/ng.core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable()
export class LayoutService {
  isCollapsed = true;

  smallScreen: boolean; // do not set true or false

  logoComponentKey = eThemeBasicComponents.Logo;

  routesComponentKey = eThemeBasicComponents.Routes;

  navItemsComponentKey = eThemeBasicComponents.NavItems;

  constructor(private subscription: SubscriptionService) {}

  private checkWindowWidth() {
    setTimeout(() => {
      if (window.innerWidth < 992) {
        if (this.smallScreen === false) {
          this.isCollapsed = false;
          setTimeout(() => {
            this.isCollapsed = true;
          }, 100);
        }
        this.smallScreen = true;
      } else {
        this.smallScreen = false;
      }
    }, 0);
  }

  subscribeWindowSize() {
    this.checkWindowWidth();

    const resize$ = fromEvent(window, 'resize').pipe(debounceTime(150));
    this.subscription.addOne(resize$, () => this.checkWindowWidth());
  }
}
