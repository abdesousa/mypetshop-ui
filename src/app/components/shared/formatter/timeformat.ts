import { NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import * as moment from 'moment';

import { Injectable } from '@angular/core';

@Injectable()
export class MomentTimeFormatter {

    readonly TIME_FORMAT = 'HH:mm:ss';
    readonly TIME_FORMAT_HHMM = 'HH:mm';

    parse(value: string): NgbTimeStruct {
        
        let hora: NgbTimeStruct;
        if (value) {
            value = value.trim();
            let mdt = moment.utc(value, this.TIME_FORMAT);
            hora =  { hour: parseInt(mdt.format('HH')), minute: parseInt(mdt.format('mm')), second: parseInt(mdt.format('ss')) };
        }
        return hora;
    }
    format(hora: NgbTimeStruct): string {
        if (!hora) return '';
        let mdt = moment([hora.hour, hora.minute, hora.second]);        
        if (!mdt.isValid()) return '';
        return mdt.format(this.TIME_FORMAT);
    }

    formatHHmm(hora: NgbTimeStruct): string {
        if (!hora) return '';
        let mdt = moment([hora.hour, hora.minute, 0]);        
        if (!mdt.isValid()) return '';
        return mdt.format(this.TIME_FORMAT_HHMM);
    }
}