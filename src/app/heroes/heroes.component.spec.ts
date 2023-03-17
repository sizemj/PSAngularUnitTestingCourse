import { Hero } from './../hero';
import { Component } from '@angular/core';
import { HeroesComponent } from './heroes.component';
import {of} from 'rxjs';

describe ('HeroesComponent', () => {
    let component: HeroesComponent
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
        {id: 1, name: 'SpiderDude', strength: 8 },
        {id:2, name: 'Wonderful Woman', strength: 24},
        {id:3, name: 'SuperDude', strength: 55}
        ]

        mockHeroService = jasmine.createSpyObj(['getHeros', 'addHero', 'deleteHero'] )

        component = new HeroesComponent(mockHeroService)
    })

    describe('delete', () => {
       it('should remove the indicated hero from the heros list', () => {
        mockHeroService.deleteHero.and.returnValue(of(true))
        component.heroes = HEROES;

        component.delete(HEROES[1]);

        let herosAfterDelete = component.heroes.map(a => a.name).toString()
    
        expect(component.heroes.length).toBe(2)
        expect(herosAfterDelete).not.toContain('Wonderful Woman');
       }) 

       it('should call deleteHero with the correct hero', () => {
         mockHeroService.deleteHero.and.returnValue(of(true));
         component.heroes = HEROES;

         component.delete(HEROES[2]);

         expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
       });
       it('should be subscribed to the observable', () => {
         mockHeroService.deleteHero.and.returnValue(of(true));
         component.heroes = HEROES;

         component.delete(HEROES[2]);

         expect(mockHeroService).toBeDefined();

         //TODO:  check that we are subscribing to the result of the deleteHero call
       });
    })
})