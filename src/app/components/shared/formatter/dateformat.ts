import { NgbDateStruct, NgbDate } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

import { Injectable } from '@angular/core';

@Injectable()
export class MomentDateFormatter {

    readonly DT_FORMAT = 'YYYY-MM-DD';

    parse(value: string): NgbDateStruct {
        
        let data: NgbDateStruct;
        if (value) {
            value = value.trim();
            let mdt = moment(value, this.DT_FORMAT);

            data = new NgbDate(parseInt(mdt.format('Y')),parseInt(mdt.format('M')),parseInt(mdt.format('D')))
        }
        return data;
    }
    format(date: NgbDateStruct): string {
        if (!date) return '';
        let mdt = moment([date.year, date.month - 1, date.day]);
        if (!mdt.isValid()) return '';
        return mdt.format(this.DT_FORMAT);
    }
}