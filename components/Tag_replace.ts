export default function Date({ fieldtext }: any) {
	fieldtext = fieldtext.replace(/(<([^>]+)>)/gi, '');

	return fieldtext;
}
