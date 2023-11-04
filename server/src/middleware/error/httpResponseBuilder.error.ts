class HttpResponseBuilder extends Error{
    static buildOK(res, data) {
        return res.status(200).json(data);
    }

    static buildNoContent(res) {
        return res.status(204).json();
    }

    static buildCreated(res, data = {}) {
        return res.status(201).json(data);
    }

    static buildBadRequest(res, error) {
        return res.status(400).json({
            code: 'ERR-400',
            message: error,
        });
    }

    static buildUnAuthorized(res, error) {
        return res.status(401).json({
            code: 'ERR-401',
            message: error,
        });
    }
}
export default HttpResponseBuilder;
