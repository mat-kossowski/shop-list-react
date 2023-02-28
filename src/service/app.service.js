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
const sortByName = ()=> {
    return function(a,b){
    const n1 = a.productName.toLowerCase()
    const n2 = b.productName.toLowerCase()
    if (n1 < n2) return -1;
    if (n1 > n2) return 1;
    return 0;
    }
}
const sortByCategory = () => {
    return function(a, b) {
        const n1 = a.category
        const n2 = b.category
        if (n1 < n2) return -1;
        if (n1 > n2) return 1;
        return 0;
    }
}




const AppService = {

    handleChange,
    handleChangeName,
    reload,
    sortByName,
    sortByCategory
}
export default AppService;