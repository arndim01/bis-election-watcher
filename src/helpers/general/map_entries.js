export default function handler({ fields }){
    const output = Object.fromEntries(
        Object.entries(fields)
        .filter(([k, v]) => {
        return true; // some irrelevant conditions here
        })
    );
    return output;
}