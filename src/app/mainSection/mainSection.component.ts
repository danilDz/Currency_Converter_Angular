import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-mainSection',
    templateUrl : './mainSection.component.html',
    styleUrls: ['./mainSection.component.scss']
})
export class MainSectionComponent implements OnInit {

    public usd = 0
    public eur = 0

    public leftInput = 0
    public rightInput = 0
    public leftCurrency = ''
    public rightCurrency = ''

    ngOnInit() {
        fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
        .then(res => res.json())
        .then(res => {
            this.usd = +(parseFloat(res[0].buy).toFixed(2))
            this.eur = +(parseFloat(res[1].buy).toFixed(2))
        })
    }

    changeValue(event: any) {
        event.target.value = event.target.value
        if(event.target.getAttribute('data-input') === 'left') {
            this.leftInput = event.target.value
            this.currencyConvert('left')
        } else {
            this.rightInput = event.target.value
            this.currencyConvert('right')
        }
    }

    changeCurrency(event: any) {
        if(event.target.getAttribute('data-input') === 'left') {
            this.leftCurrency = event.target.value
            this.currencyConvert('right')
        } else {
            this.rightCurrency = event.target.value
            this.currencyConvert('left')
        }
    }

    currencyConvert(side: any) {
        if (this.leftCurrency.length > 1 && this.rightCurrency.length > 1 && side === 'left') {
            switch(this.leftCurrency) {
                case 'uah':
                    switch (this.rightCurrency) {
                        case 'uah':
                            this.rightInput = this.leftInput
                            break;
                        case 'usd':
                            this.rightInput = +(this.leftInput / this.usd).toFixed(2)
                            break;
                        case 'eur':
                            this.rightInput = +(this.leftInput / this.eur).toFixed(2)
                            break;
                    }
                    break;
                case 'usd':
                    switch (this.rightCurrency) {
                        case 'uah':
                            this.rightInput = +(this.leftInput * this.usd).toFixed(2)
                            break;
                        case 'usd':
                            this.rightInput = this.leftInput
                            break;
                        case 'eur':
                            this.rightInput = +(this.leftInput * (this.usd/this.eur)).toFixed(2)
                            break;
                    }
                    break;
                case 'eur':
                    switch (this.rightCurrency) {
                        case 'uah':
                            this.rightInput = +(this.leftInput * this.eur).toFixed(2)
                            break;
                        case 'usd':
                            this.rightInput = +(this.leftInput * (this.eur/this.usd)).toFixed(2)
                            break;
                        case 'eur':
                            this.rightInput = this.leftInput
                            break;
                    }
                    break;
            }
        } else if (this.leftCurrency.length > 1 && this.rightCurrency.length > 1 && side === 'right') {
            switch(this.rightCurrency) {
                case 'uah':
                    switch (this.leftCurrency) {
                        case 'uah':
                            this.leftInput = this.rightInput
                            break;
                        case 'usd':
                            this.leftInput = +(this.rightInput / this.usd).toFixed(2)
                            break;
                        case 'eur':
                            this.leftInput = +(this.rightInput / this.eur).toFixed(2)
                            break;
                    }
                    break;
                case 'usd':
                    switch (this.leftCurrency) {
                        case 'uah':
                            this.leftInput = +(this.rightInput * this.usd).toFixed(2)
                            break;
                        case 'usd':
                            this.leftInput = this.rightInput
                            break;
                        case 'eur':
                            this.leftInput = +(this.rightInput * (this.usd/this.eur)).toFixed(2)
                            break;
                    }
                    break;
                case 'eur':
                    switch (this.leftCurrency) {
                        case 'uah':
                            this.leftInput = +(this.rightInput * this.eur).toFixed(2)
                            break;
                        case 'usd':
                            this.leftInput = +(this.rightInput * (this.eur/this.usd)).toFixed(2)
                            break;
                        case 'eur':
                            this.leftInput = this.rightInput
                            break;
                    }
                    break;
            }
        }
    }
}