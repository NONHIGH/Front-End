import { Component } from '@angular/core';

export interface Project {
  titulo: string;
  descripcion: string;
  imagen: string;
  code: string;
}
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  proyectos: Project[] = [
    {
      titulo: 'Encefalopatia hipoxico izquemica',
      descripcion:
        'La encefalopatía hipóxico-isquémica es una afección cerebral causada por la privación de oxígeno y la reducción del flujo sanguíneo en los neonatos. Nuestro equipo está trabajando en una solución que implica el uso de una manguera de PVC, agua y celdas Peltier para controlar la temperatura del cuerpo del neonato y prevenir o minimizar los daños cerebrales Para controlar la temperatura, usamos las celdas Peltier para enfriar o calentar el agua que fluye por la manguera, y controlamos el proceso mediante el uso de un microcontrolador Arduino. Además, hemos incorporado una alarma que se activa en caso de que la temperatura se desvíe de un rango seguro.',
      imagen:
        'https://www.neurologianeonatal.org/wp-content/uploads/2018/08/31.1-768x519.jpg',
      code: 'https://www.google.com/search?q=cielo+estrellado+4k&tbm=isch&ved=2ahUKEwjhlJmotvX-AhU1upUCHZ2pACgQ2-cCegQIABAA&oq=cielo+estrellado+4k&gs_lcp=CgNpbWcQAzIFCAAQgAQyBQgAEIAEMgUIABCABDIGCAAQBRAeMgYIABAFEB4yBggAEAUQHjIGCAAQBRAeMgYIABAFEB4yBggAEAUQHjIGCAAQBRAeOgQIIxAnOgcIABCKBRBDUKIGWIULYKUNaABwAHgAgAFGiAH4AZIBATSYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=dCZhZOGKG7X01sQPndOCwAI&bih=689&biw=1371#imgrc=jOUmhzn2iVsbzM',
    },
    {
      titulo: 'Portfolio Argentina programa',
      descripcion:
        'Mi proyecto de portfolio es una página web que me permite mostrar mis habilidades, proyectos y experiencias profesionales de una manera clara y visualmente atractiva. He diseñado la interfaz utilizando HTML, CSS y Bootstrap, y he utilizado JavaScript y Angular para crear una experiencia de usuario interactiva y fluida. Además, he incluido enlaces a mis perfiles en redes sociales y a mi repositorio de GitHub para que los empleadores o clientes potenciales puedan ver más sobre mi trabajo y contactarme fácilmente. En resumen, este proyecto me permite presentarme de manera efectiva en línea y destacar mis habilidades y logros.',
      imagen:
        'https://st4.depositphotos.com/18657574/22310/v/600/depositphotos_223100920-stock-illustration-portfolio-icon-trendy-design-style.jpg',
      code: 'https://github.com/NONHIGH/Front-End',
    },
  ];
}
