import React, {Fragment} from 'react'
import ReactTable from "react-table";
import "react-table/react-table.css";
import {Settings} from './imports/api/settings/settings'
import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions';
checkNpmVersions({
    'react': '16.8.6',
    'react-dom': '16.8.6',
    'react-meteor-hooks:':'0.3.1'
}, 'doichain:settings');

import {useSubscription,useTracker} from "react-meteor-hooks"

const SettingsTable = props => {

    const loading = useSubscription('settings')
    const settings = useTracker(() => Settings.find().fetch())
    const listItems = []

    settings.map((configItem) => {
            const thisItem = {key: configItem.key}
            if(configItem.value instanceof Object)
                thisItem.value = JSON.stringify(configItem.value)
            else
                thisItem.value = configItem.value

        listItems.push(thisItem)
    })

    return (
        <Fragment>
            <h1>SettingTable coming soon!</h1>

            <ReactTable
                data={listItems}
                columns={[
                    {
                        Header: "ConfigKey",
                        accessor: "key",
                      //  Cell: this.renderEditable
                    },
                    {
                        Header: "ConfigValue",
                        accessor: "value",
                     //   Cell: this.renderEditable
                    }
                ]}
                defaultPageSize={10}
                className="-striped -highlight"
            />
         </Fragment>
    )
}
export default SettingsTable