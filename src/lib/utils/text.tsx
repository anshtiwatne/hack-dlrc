export default function formattedText(text: string, newline: boolean = false) {
	if (text === undefined) return <span></span>

	const newText = text.replace(
			/\`(.*?)\`/g,
			(match, content) => '<span class="font-bold">' + content + '</span>'
		)

	if (newline) return <span dangerouslySetInnerHTML={{ __html: newText.replace(/\\n/g, '<br />') }}></span>
	else return <span dangerouslySetInnerHTML={{ __html: newText }}></span>
}