export default function TagReplace({ fieldtext }: any) {
	fieldtext = fieldtext.replace(/(<([^>]+)>)/gi, '');

	return fieldtext;
}