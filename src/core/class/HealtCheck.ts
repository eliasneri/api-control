export class HealtCheck {
    private dbCRM: boolean;
    private dbFLW: boolean;

    constructor(dbCRM: boolean, dbFLW: boolean) {
        this.dbCRM = dbCRM;
        this.dbFLW = dbFLW;
    }

    public getHC(): {dbCRM: boolean, dbFLW: boolean} {
        return {
            dbCRM: this.dbCRM,
            dbFLW: this.dbFLW,
        };
    }
}

export class HC {
}