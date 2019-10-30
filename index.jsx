import React from "react";
import ReactDOM from 'react-dom';

class List extends React.Component {
    constructor() {
        super();
        this.state = {
            purchase: '',
            id: 0,
            all_purchases: [],
            buyed: [],
        }
        this.add_list = this.add_list.bind(this);
        this.add_purchase = this.add_purchase.bind(this);
        this.remove = this.remove.bind(this);
        this.its_buyed = this.its_buyed.bind(this);
        this.add_enter = this.add_enter.bind(this);
    }

    add_list() {
        if (this.state.purchase) {
            const all_list = this.state.all_purchases;
        all_list.push(this.state.purchase);
        const buy = this.state.buyed;
        buy.push(false);
        this.setState({ 
            all_purchases: all_list,
            buyed: buy,
         });
        console.log(this.state.all_purchases);
        this.setState({purchase: ''});
        }   

    }

    add_purchase() {
        this.setState({ purchase: event.target.value});
    }

    remove (index) {
        const new_list = this.state.all_purchases;
        const new_buy = this.state.buyed;
        new_list.splice(index,1);
        new_buy.splice(index, 1);
        this.setState({
            all_purchases: new_list,
            buyed: new_buy,
        });
        console.log(this.state.all_purchases, index);
    }

    add_enter (event) {
        if (event.keyCode == 13) {
            this.add_list();
        }
    }

    its_buyed (index) {
        // const i_buyed = this.state.buyed.map((item, i) => {
        //    if(i === index) {
        //     this.state.buyed[item] = true;
        //     }
        // });
        // this.setState({buyed: i_buyed});
        console.log(index);
        if (this.state.buyed[index] !== true) {
                    const i_buyed = this.state.buyed;
                    i_buyed.splice(index, 1, true);
        this.setState({buyed: i_buyed});
        console.log(this.state.buyed);
        }
    }

    render() {
        const list = this.state.all_purchases.map((item, index) => (
            <label key={index}
                className={this.state.buyed[index] ? "buyed" : null}>
                <li>{item}<br/>
                <button className="get" onClick={() => this.its_buyed(index)}>Купил</button>
                <button className="del" onClick={() => this.remove(index)}>Удалить</button>
                </li>
                
            </label>
        ));
        return (
            <div>
                <div id="title">Список покупок</div>
                <input autoFocus id='input' onChange={this.add_purchase}
                    value={this.state.purchase} 
                    placeholder="Введите название покупки"
                    onKeyDown={this.add_enter}></input>
                <button onClick={this.add_list} id="ok">Ok</button>
                <div id='list'>
                    <ul>
                        {list}
                    </ul>
                </div>
            </div>
        )

    }
}


ReactDOM.render((
    <List />
)
    , document.getElementById('root'));