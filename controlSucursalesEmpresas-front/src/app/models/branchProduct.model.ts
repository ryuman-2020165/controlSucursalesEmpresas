export class BranchProductModel {
    constructor(
        public id: string,
        public product: string,
        public branchOffice: string,
        public stock: number
    ) { }
}