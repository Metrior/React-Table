import React, { Component } from 'react';
import PropTypes from 'prop-types';

// @CHILD CLASSES
import TableHeader from './TableHeader';
import TableBody from './TableBody';

class Table extends Component {

    constructor() {
        super();

        this.state = {
            activeRowID: [],
            myUserList: [],
            searchValue: 0
        }

    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            myUserList: nextProps.data
        });
    }

    // (1) TODO HOME WORK
    deleteFromTable = () => {
        const array = this.state.myUserList;
        const activeRows = this.state.activeRowID;

        for (let i = 0; i < array.length; i++) {
            if (activeRows.includes(array[i])) {
                delete array[i];
            }

        };

        this.setState({
            myUserList: array
        });


    }

    searchFromTable = (e) =>{
        const {value} = e.target
        this.setState({
            searchValue: value })
    }

    activeRowHanlder = (value) => {
        const array = this.state.activeRowID;
        if (array.indexOf(value) > -1) {
            let indexToRemove = array.indexOf(value);
            array.splice(indexToRemove, 1);

        } else {
            array.push(value);

        }

        localStorage.setItem('activeUsers', array);
        this.setState({
            activeRowID: array
        });


    }

    render() {
        const { data } = this.props;
        const headerColumnNames = this.state.myUserList.length > 0 ? Object.keys(this.state.myUserList[0]) : [];
        headerColumnNames.unshift('checkbox');
        const activeColumns = ['checkbox', 'id', 'title'];
        return (
            <div>
                <input onChange={this.searchFromTable}
                       placeholder={'search from title'}/>
                <button
                    style={{ display: this.state.activeRowID.length > 1 ? "block" : "none"}}
                    onClick={this.deleteFromTable}
                >MULTIPLY DELETE</button>
                <table className="rwd-table">
                    <TableHeader
                        activeColumns={activeColumns}
                        headerColumnNames={headerColumnNames}
                    >
                    </TableHeader>
                    <TableBody
                        activeRowID={this.state.activeRowID}
                        activeRowHanlder={this.activeRowHanlder}
                        data={data.length > 0 ? data : []}
                        isCheckboxActive={activeColumns.indexOf('checkbox') > -1}
                        searchValue={this.state.searchValue}
                    >
                    </TableBody>
                </table>
            </div>
        );
    }
}

Table.propTypes = {
    data: PropTypes.array
}


export default Table;

