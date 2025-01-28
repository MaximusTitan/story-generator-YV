import { NextResponse } from 'next/server'
import PDFDocument from 'pdfkit'

export async function POST(request: Request) {
  try {
    const { title, summary, scenes } = await request.json()
    
    // Create a PDF document
    const doc = new PDFDocument()
    let buffers: Buffer[] = []
    
    doc.on('data', buffers.push.bind(buffers))
    
    // Add content to PDF
    doc.fontSize(24).text(title, { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).text(summary)
    doc.moveDown()
    
    scenes.forEach((scene: any) => {
      doc.fontSize(16).text(scene.title)
      doc.moveDown()
      doc.fontSize(12).text(scene.content)
      doc.moveDown()
    })
    
    doc.end()
    
    // Combine buffers
    const pdfData = Buffer.concat(buffers)
    
    return new Response(pdfData, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${title}.pdf"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
