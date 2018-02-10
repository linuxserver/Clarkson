import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable()
export class DashboardService {

    constructor(private apiService: ApiService) { }

    public getTopStats() {
        return this.apiService.getDashboardTopStats();
    }
}
