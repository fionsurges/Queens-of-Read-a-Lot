import React, {Component} from 'react'
import { Header } from 'semantic-ui-react'

class HeaderComponent extends Component {
    constructor(props){
    super(props)
    this.state = {}
    }

    render(){
        return(
        <header>
            <Header as='h1' icon='book' content='Queens of Read-A-Lot'/>
        </header>
        )
    }
}

export default HeaderComponent
