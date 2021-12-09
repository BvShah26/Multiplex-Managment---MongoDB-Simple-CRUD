function CartImplement() {
    //S captial
    const [products, SetProducts] = React.useState(
        [
            {
                name: "Tea",
                price: 15,
                qty: 0,
                total: 0
            },

            {
                name: "Coffee",
                price: 25,
                qty: 0,
                total: 0
            },

            {
                name: "Milkshake",
                price: 80,
                qty: 0,
                total: 0
            }
        ]);

    return (
        <>
            <h1>hello Cart</h1>
            {
                products.map(p => <h2>{p.name}</h2>)
            }
        </>
    )

}

ReactDOM.render(
    <CartImplement />,
    document.getElementById("root"));