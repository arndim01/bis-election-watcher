export default function handler(useFormObject) {
    const register = (name, options) => ({
      ...useFormObject.register(name, options),
      InputLabelProps:{ shrink:!!useFormObject.watch(name) }
    });
    return {
      ...useFormObject,
      register
    };
}
