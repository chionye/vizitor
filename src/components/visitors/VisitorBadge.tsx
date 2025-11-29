import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Visitor } from '@/types';
import { format } from 'date-fns';
import { Button } from '@/components/common';
import { Printer } from 'lucide-react';

interface VisitorBadgeProps {
  visitor: Visitor;
}

export const VisitorBadge: React.FC<VisitorBadgeProps> = ({ visitor }) => {
  const badgeRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (badgeRef.current) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Visitor Badge - ${visitor.fullName}</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                }
                .badge {
                  width: 350px;
                  border: 2px solid #2563eb;
                  border-radius: 12px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .badge-header {
                  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                  color: white;
                  padding: 20px;
                  text-align: center;
                }
                .badge-body {
                  padding: 20px;
                  background: white;
                }
                .visitor-name {
                  font-size: 24px;
                  font-weight: bold;
                  margin: 0;
                }
                .visitor-code {
                  font-size: 14px;
                  margin-top: 5px;
                  opacity: 0.9;
                }
                .info-row {
                  margin: 15px 0;
                  padding-bottom: 10px;
                  border-bottom: 1px solid #e5e7eb;
                }
                .info-label {
                  font-size: 12px;
                  color: #6b7280;
                  text-transform: uppercase;
                  letter-spacing: 0.5px;
                }
                .info-value {
                  font-size: 16px;
                  color: #111827;
                  margin-top: 4px;
                  font-weight: 500;
                }
                .qr-container {
                  display: flex;
                  justify-content: center;
                  margin: 20px 0;
                  padding: 15px;
                  background: #f9fafb;
                  border-radius: 8px;
                }
                .footer {
                  text-align: center;
                  font-size: 11px;
                  color: #9ca3af;
                  margin-top: 15px;
                }
                @media print {
                  body {
                    padding: 0;
                  }
                  .no-print {
                    display: none;
                  }
                }
              </style>
            </head>
            <body>
              ${badgeRef.current.innerHTML}
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
    }
  };

  const qrData = JSON.stringify({
    id: visitor.id,
    name: visitor.fullName,
    code: visitor.visitorCode,
    checkIn: visitor.checkInTime,
  });

  return (
    <div className="space-y-4">
      <div ref={badgeRef} className="badge">
        <div className="badge-header">
          <h2 className="visitor-name">{visitor.fullName}</h2>
          <p className="visitor-code">Visitor Code: {visitor.visitorCode}</p>
        </div>

        <div className="badge-body">
          <div className="info-row">
            <div className="info-label">Company</div>
            <div className="info-value">{visitor.company || 'N/A'}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Visiting</div>
            <div className="info-value">{visitor.hostStaffName}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Purpose</div>
            <div className="info-value">{visitor.purpose}</div>
          </div>

          <div className="info-row">
            <div className="info-label">Check-In Time</div>
            <div className="info-value">
              {format(new Date(visitor.checkInTime), 'MMM dd, yyyy - hh:mm a')}
            </div>
          </div>

          <div className="qr-container">
            <QRCodeCanvas
              value={qrData}
              size={150}
              level="H"
              includeMargin={true}
            />
          </div>

          <div className="footer">
            This badge must be worn at all times while on premises
          </div>
        </div>
      </div>

      <div className="flex justify-end no-print">
        <Button onClick={handlePrint} className="flex items-center">
          <Printer size={18} className="mr-2" />
          Print Badge
        </Button>
      </div>

      <style>{`
        .badge {
          width: 350px;
          margin: 0 auto;
          border: 2px solid #2563eb;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .badge-header {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          padding: 20px;
          text-align: center;
        }
        .badge-body {
          padding: 20px;
          background: white;
        }
        .visitor-name {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }
        .visitor-code {
          font-size: 14px;
          margin-top: 5px;
          opacity: 0.9;
        }
        .info-row {
          margin: 15px 0;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e7eb;
        }
        .info-row:last-of-type {
          border-bottom: none;
        }
        .info-label {
          font-size: 12px;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-value {
          font-size: 16px;
          color: #111827;
          margin-top: 4px;
          font-weight: 500;
        }
        .qr-container {
          display: flex;
          justify-content: center;
          margin: 20px 0;
          padding: 15px;
          background: #f9fafb;
          border-radius: 8px;
        }
        .footer {
          text-align: center;
          font-size: 11px;
          color: #9ca3af;
          margin-top: 15px;
        }
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
