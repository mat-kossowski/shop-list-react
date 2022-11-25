import React, {useState} from 'react';

const NewProduct = ({onAdd})=> {
    const [productName, setName] = useState('')
    const [productAmount, setAmount] = useState('')
    const [shopListId, setShopListId] = useState(1)

const onSubmit = (e) => {
    e.preventDefault()

    if (!productName) {
      alert('Please add a task')
      return
    }

    onAdd({ productName, productAmount, "shopList": {shopListId }})

    setName('')
    setAmount('')
    setShopListId(1)
  }

    return (

        <>
            <div className={"container"}>
                <form className='add-form' onSubmit={onSubmit}>
                <div className={'one-product'}>
                    <div className={'name-product'}>
                        <input
                    type='text'
                    placeholder='Add Product'
                    value={productName}
                    onChange={(e) => setName(e.target.value)}
                />
                    </div>
                    <div className={'amount-product'}>
                        <input
                    type='text'
                    placeholder='Amount'
                    value={productAmount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                    </div>
                    <div className={'delete-product'}>
                        <input type='submit' value='Save' className='btn'/>
                    </div>
                </div>
                    </form>
            </div>
        </>





    );
}

export default NewProduct;


