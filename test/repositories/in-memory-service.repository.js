"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryServiceRepository = void 0;
class InMemoryServiceRepository {
    constructor() {
        this.items = [];
    }
    create(service) {
        return __awaiter(this, void 0, void 0, function* () {
            this.items.push(service);
        });
    }
    update(service) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemIndex = this.items.findIndex((item) => item.id === service.id);
            this.items[itemIndex] = service;
        });
    }
    delete(service) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemIndex = this.items.findIndex((item) => item.id === service.id);
            this.items.splice(itemIndex, 1);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.items;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = this.items.find((item) => item.id.toString() === id);
            if (!service) {
                return null;
            }
            return service;
        });
    }
}
exports.InMemoryServiceRepository = InMemoryServiceRepository;
