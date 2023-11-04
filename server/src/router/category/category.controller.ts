import { HttpResponseBuilder } from "../../middleware/error";
import { categoryService } from "./index";
class categoryController {
    constructor() {
        this.getCategories = this.getCategories.bind(this);
    }
    async getCategories(req, res, next) {
        try {
            const { slug } = req.params;
            const data = await categoryService.getCategories(slug, req.query.page, req.query.limit);
            
            return HttpResponseBuilder.buildOK(res, data);
        } catch (error:any) {
            next(HttpResponseBuilder);
        }
    }
    createCategory(req, res, next) {
        try {
            const category = categoryService.createCategory(req.body);
            return HttpResponseBuilder.buildCreated(res, category);
        } catch (error:any) {
            next(HttpResponseBuilder.buildBadRequest(res, error.message));
        }
    }
}

export default new categoryController()