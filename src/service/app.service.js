import ProductService from "../Product/product.service";

const handleChange = (setForm, form) => {
    return function (event) {
        const {name, value} = event.target;
        setForm({...form, [name]: value});
    }
}

function handleChangeName(setForm, form) {
    return function (event) {
        const {name, value} = event.target;
        if (value === "") {
            setForm(() => {
                return {
                    ...form, [name]: ""
                };
            });
        } else {
            setForm(() => {
                return {
                    ...form, [name]: value
                };
            });
        }
    }
}

const reload = (setForm, form) => {
    return function () {
        let newForm = form
        if (newForm.productName !== "") {
        } else {
            newForm.productName = "Nazwa"
        }
        setForm(newForm)
        console.log(newForm)
    }
}
const clickStatusProduct = (setList, sortAlphabet, list) => {
    return function (productId) {
        let newLists = [...list];
        newLists
            .filter(product => product.productId === productId)
            .map(product => !product.productStatus ? product.productStatus = true : product.productStatus = false)
        if (sortAlphabet === true) {
            newLists
                .sort(sortByName)
        } else {
            newLists
                .sort(sortByName)
            newLists
                .sort(sortByCategory)
        }

        setList(newLists)
    }
}

const sort = (shopListId, setList ) => {
    return function (x){
    if (x === true) {
        ProductService.getProductsAlphabet(shopListId)
            .then(res => setList(res.data))
            .then(r => console.log(r));
    } else {
        ProductService.getProductsCategory(shopListId)
            .then(res => setList(res.data))
            .then(r => console.log(r));
    }
    }
}

const sortByName = (a, b) => {
        const n1 = a.productName.toLowerCase()
        const n2 = b.productName.toLowerCase()
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;

}

const sortByCategory = (a,b) => {
        const n1 = a.category
        const n2 = b.category
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;

}

const clickSortAlphabet = (setSortAlphabet, setList, list) => {
    return function () {
        setSortAlphabet(true)
        let newLists = [...list];
        console.log(newLists)
        newLists
            .sort(sortByCategory)
        newLists
            .sort(sortByName)
        setList(newLists)
    }
}
const clickSortCategory = (setSortAlphabet, setList, list) => {
    return function () {
        setSortAlphabet(false)
        let newLists = [...list];
        newLists
            .sort(sortByCategory)
        setList(newLists)
    }
}
const clickDeleteItem = (setList, list) => {
    return function (productId){
    let newLists = [...list];
    newLists = list.filter(product => product.productId !== productId)
    setList(newLists);
}
};


const AppService = {

    handleChange,
    handleChangeName,
    reload,
    sortByName,
    sortByCategory,
    clickStatusProduct,
    clickSortAlphabet,
    sort,
    clickSortCategory,
    clickDeleteItem
}
export default AppService;