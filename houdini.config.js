/** @type {import('houdini').ConfigFile} */
const config = {
	client: './src/client',
	schemaPath: './schema.graphql',
	apiUrl: 'http://localhost:5173/graphql',
	schemaPollInterval: null,
	scalars: {
		DateTime: {
			type: 'Date',
			unmarshal(val) {
				return new Date(val);
			},
			marshal(date) {
				return date.toString();
			}
		}
	},
};

export default config;
