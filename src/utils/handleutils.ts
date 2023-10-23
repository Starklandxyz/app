import { getEntityIdFromKeys } from "../dojo/parseEvent";
import { ComponentValue, Has, defineSystem, getComponentValue, setComponent } from "../../node_modules/@latticexyz/recs/src/index";

export const handleSQLResult = (edges: any, contractComponents: any) => {
    if (!edges) { return }

    for (let index = 0; index < edges.length; index++) {
        const element = edges[index];
        const components = element?.node?.models
        const keys = element?.node?.keys
        const nkeys = keys.map((key: any) => BigInt(key));
        for (let j = 0; j < components.length; j++) {
            const component = components[j];
            const propertyCount = Object.keys(component).length;
            if (propertyCount == 1) {
                continue
            }
            const contractComponent = contractComponents[component.__typename]
            const componentValues = Object.keys(contractComponent.schema).reduce((acc: ComponentValue, key, _) => {
                acc[key] = component[key]
                return acc;
            }, {});
            setComponent(contractComponent, getEntityIdFromKeys(nkeys), componentValues)
        }
    }
}

export const handleWssResult = (models: Array<any>, keys: Array<string>, contractComponents: any) => {
    const nkeys = keys.map((key: any) => BigInt(key));
    for (let index = 0; index < models.length; index++) {
        const model = models[index];
        const propertyCount = Object.keys(model).length;
        if (propertyCount == 1) {
            continue
        }
        const contractComponent = contractComponents[model.__typename]
        const componentValues = Object.keys(contractComponent.schema).reduce((acc: ComponentValue, key, _) => {
            acc[key] = model[key]
            return acc;
        }, {});
        console.log("handleWssResult",model,componentValues);
        setComponent(contractComponent, getEntityIdFromKeys(nkeys), componentValues)
    }
}