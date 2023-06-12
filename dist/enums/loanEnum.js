"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanStatusEnum = exports.LoanTypeEnum = void 0;
var LoanTypeEnum;
(function (LoanTypeEnum) {
    LoanTypeEnum["received"] = "received";
    LoanTypeEnum["given"] = "given";
})(LoanTypeEnum || (exports.LoanTypeEnum = LoanTypeEnum = {}));
var LoanStatusEnum;
(function (LoanStatusEnum) {
    LoanStatusEnum["pending"] = "pending";
    LoanStatusEnum["paid"] = "paid";
    LoanStatusEnum["unpaid"] = "unpaid";
})(LoanStatusEnum || (exports.LoanStatusEnum = LoanStatusEnum = {}));
