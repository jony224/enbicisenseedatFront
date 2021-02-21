import { animate, state, style, transition, trigger } from '@angular/animations';

export const HeaderAnimations = [
    trigger('hover', [
        state('collapse', style({
            width: '48px'
        })),
        state('expanded', style({
            width: '200px'
        })),
        transition('* <=> *', animate('.5s cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
];
