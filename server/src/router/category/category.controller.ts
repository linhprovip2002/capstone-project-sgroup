import { categoryService } from "./index";
class categoryController {
    constructor() {
        this.getCategories = this.getCategories.bind(this);
    }
    async getCategories(req, res, next) {
        try {
            const { slug } = req.params;
            const data = await categoryService.getCategories(slug, req.query.page, req.query.limit);
            console.log(data + "aaaaaaaaaa");
            
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }
    createCategory(req, res, next) {
        try {
            const category = categoryService.createCategory(req.body);
            res.status(200).json({ category });
        } catch (error) {
            next(error);
        }
    }
}

export default new categoryController()