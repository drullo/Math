"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var GridComponent = /** @class */ (function () {
    function GridComponent() {
        this.minX = 10;
        this.maxX = 12;
        this.minY = 0;
        this.maxY = 12;
        this.x = [];
        this.y = [];
    }
    GridComponent.prototype.ngOnInit = function () {
        this.populateGrid();
        console.log(this.x);
    };
    GridComponent.prototype.populateGrid = function () {
        while (this.x.length < (this.maxX - this.minX)) {
            this.x.push(this.getNext(this.x, this.minX, this.maxX));
        }
    };
    GridComponent.prototype.getNext = function (numArray, min, max) {
        var newNum = Math.round(Math.random() * (max - min)) + min;
        return numArray.find(function (n) { return n === newNum; }) ?
            this.getNext(numArray, min, max) :
            newNum;
    };
    GridComponent = __decorate([
        core_1.Component({
            selector: 'app-grid',
            templateUrl: './grid.component.html',
            styleUrls: ['./grid.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], GridComponent);
    return GridComponent;
}());
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map