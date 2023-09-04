import type { Comic } from '../../entities/Comic';

const comic: Comic = {
  id: '1158',
  title: 'ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB (Trade Paperback)',
  description:
    "The Ultimates vs. the Ultimate X-Men: the battle begins. When the X-Men do the worst thing they could to humanity, the government orders Captain America, Iron Man, Thor and the rest of the Ultimates to bring them down. A small but lethal army, the Ultimates were created to face these and other newly rising threats to mankind. But the X-Men's founder, Professor X, hasn't been training his students for nothing -- and the youngs mutants just might take out the Ultimates first.",
  thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/2/f0/4bc6670c80007.jpg',
  price: 9.99,
  creators: [
    {
      name: 'Chris Bachalo',
      role: 'penciller'
    },
    {
      name: 'Virtual Calligr',
      role: 'letterer'
    },
    {
      name: 'Olivier Coipel',
      role: 'penciler'
    },
    {
      name: 'Mike Deodato',
      role: 'penciler'
    },
    {
      name: 'Geoff Johns',
      role: 'writer'
    },
    {
      name: 'Bruce Jones',
      role: 'writer'
    },
    {
      name: 'Mark Millar',
      role: 'writer'
    },
    {
      name: 'Paul Mounts',
      role: 'colorist'
    },
    {
      name: 'Tim Townsend',
      role: 'inker'
    }
  ],
  characters: [
    {
      name: 'Beast (Ultimate)',
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    },
    {
      name: 'Black Widow (Ultimate)',
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Captain America (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Colossus (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Hawkeye (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Hulk (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Iceman (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Jean Grey (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Magneto (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Nick Fury (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Quicksilver (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Rogue (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Scarlet Witch (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Storm (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Thor (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Vanisher (Ultimate)'
    },
    {
      id: '1009165',
      thumbnail:
        'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg',
      name: 'Wasp (Ultimate)'
    }
  ]
};

export const getComicSpotlight = () => new Response(JSON.stringify(comic));

export const getLatestRealeases = () =>
  new Response(JSON.stringify([comic, comic, comic, comic, comic, comic]));
