import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-compra-realizada',
  templateUrl: './compra-realizada.page.html',
  styleUrls: ['./compra-realizada.page.scss']
})
export class CompraRealizadaPage implements OnInit, OnDestroy {
  orderId: string | null = null;
  status: string | null = null;
  amount: string | null = null;
  private routeSub: Subscription | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Suscríbete a los parámetros de la URL solo una vez
    this.routeSub = this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
      this.status = params['status'];
      this.amount = params['amount'];

      console.log("Orden ID:", this.orderId);
      console.log("Estado:", this.status);
      console.log("Monto:", this.amount);
    });
  }

  ngOnDestroy(): void {
    // Limpia la suscripción para evitar fugas de memoria
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}