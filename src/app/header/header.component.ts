import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    public usd = 0
    public eur = 0

    ngOnInit() {
        fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
        .then(res => res.json())
        .then(res => {
            this.usd = +(parseFloat(res[0].buy).toFixed(2))
            this.eur = +(parseFloat(res[1].buy).toFixed(2))
        })
    }
    
}