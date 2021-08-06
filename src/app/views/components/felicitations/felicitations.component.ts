import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Main} from 'tsparticles';
import {loadConfettiShape} from 'tsparticles-shape-confetti';


@Component({
  selector: 'app-felicitations',
  templateUrl: './felicitations.component.html',
  styleUrls: ['./felicitations.component.scss']
})
export class FelicitationsComponent implements OnInit {

  @Input() message;
  @Input() lotId;
  @Input() lotName;
  @Input() userName;
  constructor(public activeModal: NgbActiveModal) { }

  id = 'tsparticles';

  particlesOptions = {
    fullScreen: {
      enable: true
    },
    particles: {
      number: {
        value: 0
      },
      color: {
        value: ['#1E00FF', '#FF0061', '#E1FF00', '#00FF9E']
      },
      shape: {
        type: 'confetti',
        options: {
          confetti: {
            type: ['circle', 'square']
          }
        }
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 2,
          startValue: 'max',
          destroy: 'min'
        }
      },
      size: {
        value: 7,
        random: {
          enable: true,
          minimumValue: 3
        }
      },
      life: {
        duration: {
          sync: true,
          value: 5
        },
        count: 1
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
          acceleration: 20
        },
        speed: 50,
        decay: 0.05,
        direction: 'none',
        outModes: {
          default: 'destroy',
          top: 'none'
        }
      }
    },
    interactivity: {
      detectsOn: 'canvas',
      events: {
        resize: true
      }
    },
    detectRetina: true,
    background: {
      color: 'transparent'
    },
    responsive: [
      {
        maxWidth: 700,
        options: {
          particles: {
            move: {
              speed: 30,
              decay: 0.05
            }
          }
        }
      }
    ],
    emitters: [
      {
        direction: 'top-right',
        rate: {
          delay: 0.1,
          quantity: 10
        },
        position: {
          x: 0,
          y: 50
        },
        size: {
          width: 0,
          height: 0
        }
      },
      {
        direction: 'top-left',
        rate: {
          delay: 0.1,
          quantity: 10
        },
        position: {
          x: 100,
          y: 50
        },
        size: {
          width: 0,
          height: 0
        }
      }
    ]
  };

  particlesInit(main: Main): void {
    loadConfettiShape(main);
  }

  ngOnInit(): void {}
}
