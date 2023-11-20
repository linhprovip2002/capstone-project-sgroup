import { HttpResponseBuilder } from "../../middleware/error";
import { categoryService } from "./index";
class categoryController {
    constructor() {
        this.getCategories = this.getCategories.bind(this);
    }
    async getCategories(req, res, next) {
        try {
            console.log("hehehe");
            
            const { slug } = req.params;
            const data = await categoryService.getCategories(slug, req.query.page, req.query.limit);
            
            return HttpResponseBuilder.buildOK(res, data);
        } catch (error:any) {
            error.status = 404;
            next(error);
        }
    }
    createCategory(req, res, next) {
        try {
            const category = categoryService.createCategory(req.body);
            return HttpResponseBuilder.buildCreated(res, category);
        } catch (error:any) {
            error.status = 400;
            next(error);
        }
    }
    async getListCategories(req, res, next) {
        try {
            const categories =await categoryService.getListCategories();
            console.log(categories);
            
            return HttpResponseBuilder.buildOK(res, categories);
        } catch (error:any) {
            error.status = 400;
            next(error);
        }
    }
}

export default new categoryController()