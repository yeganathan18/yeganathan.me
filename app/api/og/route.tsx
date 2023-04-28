import { ImageResponse } from '@vercel/og';

export const runtime = "edge"

const font = fetch(
  new URL('../../../public/fonts/CalSans-SemiBold.ttf', import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: Request) {
  const url = new URL(req.url)
  const searchParams = Object.fromEntries(url.searchParams)
  const postTitle = searchParams.title
  const fontData = await font;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundImage: 'url(https://yeganathan.me/og-bg.png)',
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 130,
            fontFamily: 'CalSans',
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080,
      fonts: [
        {
          name: 'CalSans',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  );
}
