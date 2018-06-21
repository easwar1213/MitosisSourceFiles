namespace KMHSSS
{
    partial class Daily_Overall_Bill_Report_Frm
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.label3 = new System.Windows.Forms.Label();
            this.crystalReportViewer1 = new CrystalDecisions.Windows.Forms.CrystalReportViewer();
            this.To_Date_Dtp = new System.Windows.Forms.DateTimePicker();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.label2 = new System.Windows.Forms.Label();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.View_Btn = new System.Windows.Forms.Button();
            this.From_Date_Dtp = new System.Windows.Forms.DateTimePicker();
            this.Close_Btn = new System.Windows.Forms.Button();
            this.label9 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.SuspendLayout();
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(32, 39);
            this.label3.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(87, 21);
            this.label3.TabIndex = 271;
            this.label3.Text = "From Date";
            // 
            // crystalReportViewer1
            // 
            this.crystalReportViewer1.ActiveViewIndex = -1;
            this.crystalReportViewer1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.crystalReportViewer1.Location = new System.Drawing.Point(35, 43);
            this.crystalReportViewer1.Name = "crystalReportViewer1";
            this.crystalReportViewer1.SelectionFormula = "";
            this.crystalReportViewer1.Size = new System.Drawing.Size(1188, 469);
            this.crystalReportViewer1.TabIndex = 31;
            this.crystalReportViewer1.ViewTimeSelectionFormula = "";
            // 
            // To_Date_Dtp
            // 
            this.To_Date_Dtp.CustomFormat = "";
            this.To_Date_Dtp.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.To_Date_Dtp.Location = new System.Drawing.Point(395, 36);
            this.To_Date_Dtp.Name = "To_Date_Dtp";
            this.To_Date_Dtp.Size = new System.Drawing.Size(141, 28);
            this.To_Date_Dtp.TabIndex = 269;
            this.To_Date_Dtp.Value = new System.DateTime(2014, 5, 24, 0, 0, 0, 0);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.crystalReportViewer1);
            this.groupBox2.Location = new System.Drawing.Point(25, 119);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(1254, 540);
            this.groupBox2.TabIndex = 19;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Report";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(302, 39);
            this.label2.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(76, 21);
            this.label2.TabIndex = 270;
            this.label2.Text = " To Date";
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.To_Date_Dtp);
            this.groupBox3.Controls.Add(this.label3);
            this.groupBox3.Controls.Add(this.label2);
            this.groupBox3.Controls.Add(this.View_Btn);
            this.groupBox3.Controls.Add(this.From_Date_Dtp);
            this.groupBox3.Controls.Add(this.Close_Btn);
            this.groupBox3.Location = new System.Drawing.Point(267, 23);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(725, 88);
            this.groupBox3.TabIndex = 34;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Select";
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(590, 21);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(84, 56);
            this.View_Btn.TabIndex = 267;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // From_Date_Dtp
            // 
            this.From_Date_Dtp.CustomFormat = "";
            this.From_Date_Dtp.Format = System.Windows.Forms.DateTimePickerFormat.Short;
            this.From_Date_Dtp.Location = new System.Drawing.Point(139, 35);
            this.From_Date_Dtp.Name = "From_Date_Dtp";
            this.From_Date_Dtp.Size = new System.Drawing.Size(137, 28);
            this.From_Date_Dtp.TabIndex = 268;
            this.From_Date_Dtp.Value = new System.DateTime(2014, 5, 24, 0, 0, 0, 0);
            // 
            // Close_Btn
            // 
            this.Close_Btn.DialogResult = System.Windows.Forms.DialogResult.Cancel;
            this.Close_Btn.Location = new System.Drawing.Point(590, 21);
            this.Close_Btn.Name = "Close_Btn";
            this.Close_Btn.Size = new System.Drawing.Size(84, 56);
            this.Close_Btn.TabIndex = 3;
            this.Close_Btn.Text = "Close";
            this.Close_Btn.UseVisualStyleBackColor = true;
            this.Close_Btn.Click += new System.EventHandler(this.Close_Btn_Click);
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(569, 16);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(235, 27);
            this.label9.TabIndex = 44;
            this.label9.Text = "Daily Overall Bill Report";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.groupBox3);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(30, 44);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1307, 687);
            this.groupBox1.TabIndex = 43;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Daily Overall Bill Report";
            // 
            // Daily_Overall_Bill_Report_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.CancelButton = this.Close_Btn;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.groupBox1);
            this.Name = "Daily_Overall_Bill_Report_Frm";
            this.Text = "Daily Overall Bill Report";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Daily_Overall_Bill_Report_Frm_Load);
            this.groupBox2.ResumeLayout(false);
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label3;
        private CrystalDecisions.Windows.Forms.CrystalReportViewer crystalReportViewer1;
        private System.Windows.Forms.DateTimePicker To_Date_Dtp;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.Button View_Btn;
        private System.Windows.Forms.DateTimePicker From_Date_Dtp;
        private System.Windows.Forms.Button Close_Btn;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.GroupBox groupBox1;

    }
}