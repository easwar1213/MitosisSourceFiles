namespace KMHSSS
{
    partial class Student_Personal_Details_Report_Frm
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
            this.label9 = new System.Windows.Forms.Label();
            this.View_Btn = new System.Windows.Forms.Button();
            this.crystalReportViewer1 = new CrystalDecisions.Windows.Forms.CrystalReportViewer();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.EYear_Txt = new System.Windows.Forms.TextBox();
            this.SYear_CBox = new System.Windows.Forms.ComboBox();
            this.label1 = new System.Windows.Forms.Label();
            this.Sec_CBox = new System.Windows.Forms.ComboBox();
            this.label5 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.Class_CBox = new System.Windows.Forms.ComboBox();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Font = new System.Drawing.Font("Comic Sans MS", 14.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.Location = new System.Drawing.Point(528, 21);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(309, 27);
            this.label9.TabIndex = 48;
            this.label9.Text = "Student Personal Details Report";
            // 
            // View_Btn
            // 
            this.View_Btn.Location = new System.Drawing.Point(1043, 18);
            this.View_Btn.Name = "View_Btn";
            this.View_Btn.Size = new System.Drawing.Size(84, 43);
            this.View_Btn.TabIndex = 19;
            this.View_Btn.Text = "View";
            this.View_Btn.UseVisualStyleBackColor = true;
            this.View_Btn.Click += new System.EventHandler(this.View_Btn_Click);
            // 
            // crystalReportViewer1
            // 
            this.crystalReportViewer1.ActiveViewIndex = -1;
            this.crystalReportViewer1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.crystalReportViewer1.Location = new System.Drawing.Point(35, 38);
            this.crystalReportViewer1.Name = "crystalReportViewer1";
            this.crystalReportViewer1.SelectionFormula = "";
            this.crystalReportViewer1.Size = new System.Drawing.Size(1193, 513);
            this.crystalReportViewer1.TabIndex = 31;
            this.crystalReportViewer1.ViewTimeSelectionFormula = "";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.EYear_Txt);
            this.groupBox1.Controls.Add(this.SYear_CBox);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Controls.Add(this.Sec_CBox);
            this.groupBox1.Controls.Add(this.label5);
            this.groupBox1.Controls.Add(this.View_Btn);
            this.groupBox1.Controls.Add(this.label13);
            this.groupBox1.Controls.Add(this.groupBox2);
            this.groupBox1.Controls.Add(this.Class_CBox);
            this.groupBox1.Font = new System.Drawing.Font("Comic Sans MS", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBox1.Location = new System.Drawing.Point(31, 61);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(1310, 665);
            this.groupBox1.TabIndex = 47;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Student Personal Details Report";
            // 
            // EYear_Txt
            // 
            this.EYear_Txt.Enabled = false;
            this.EYear_Txt.ForeColor = System.Drawing.Color.Black;
            this.EYear_Txt.Location = new System.Drawing.Point(437, 27);
            this.EYear_Txt.Name = "EYear_Txt";
            this.EYear_Txt.Size = new System.Drawing.Size(97, 28);
            this.EYear_Txt.TabIndex = 234;
            // 
            // SYear_CBox
            // 
            this.SYear_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.SYear_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.SYear_CBox.FormattingEnabled = true;
            this.SYear_CBox.Location = new System.Drawing.Point(336, 26);
            this.SYear_CBox.Name = "SYear_CBox";
            this.SYear_CBox.Size = new System.Drawing.Size(95, 29);
            this.SYear_CBox.TabIndex = 233;
            this.SYear_CBox.SelectedIndexChanged += new System.EventHandler(this.SYear_CBox_SelectedIndexChanged);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(266, 32);
            this.label1.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(54, 21);
            this.label1.TabIndex = 235;
            this.label1.Text = "AYear";
            // 
            // Sec_CBox
            // 
            this.Sec_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Sec_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Sec_CBox.FormattingEnabled = true;
            this.Sec_CBox.Location = new System.Drawing.Point(856, 24);
            this.Sec_CBox.Name = "Sec_CBox";
            this.Sec_CBox.Size = new System.Drawing.Size(146, 29);
            this.Sec_CBox.TabIndex = 68;
            this.Sec_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Sec_CBox_KeyDown);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(786, 30);
            this.label5.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(63, 21);
            this.label5.TabIndex = 69;
            this.label5.Text = "Section";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(544, 31);
            this.label13.Margin = new System.Windows.Forms.Padding(4, 0, 4, 0);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(45, 21);
            this.label13.TabIndex = 67;
            this.label13.Text = "Class";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.crystalReportViewer1);
            this.groupBox2.Location = new System.Drawing.Point(25, 57);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(1257, 582);
            this.groupBox2.TabIndex = 19;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Report";
            // 
            // Class_CBox
            // 
            this.Class_CBox.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.SuggestAppend;
            this.Class_CBox.AutoCompleteSource = System.Windows.Forms.AutoCompleteSource.ListItems;
            this.Class_CBox.FormattingEnabled = true;
            this.Class_CBox.Location = new System.Drawing.Point(628, 27);
            this.Class_CBox.Name = "Class_CBox";
            this.Class_CBox.Size = new System.Drawing.Size(138, 29);
            this.Class_CBox.TabIndex = 66;
            this.Class_CBox.SelectedIndexChanged += new System.EventHandler(this.Class_CBox_SelectedIndexChanged);
            this.Class_CBox.KeyDown += new System.Windows.Forms.KeyEventHandler(this.Class_CBox_KeyDown);
            // 
            // Student_Personal_Details_Report_Frm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.SteelBlue;
            this.ClientSize = new System.Drawing.Size(1366, 746);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.groupBox1);
            this.Name = "Student_Personal_Details_Report_Frm";
            this.Text = "Student Personal Details Report";
            this.WindowState = System.Windows.Forms.FormWindowState.Maximized;
            this.Load += new System.EventHandler(this.Student_Personal_Details_Report_Frm_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Button View_Btn;
        private CrystalDecisions.Windows.Forms.CrystalReportViewer crystalReportViewer1;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.ComboBox Sec_CBox;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.ComboBox Class_CBox;
        private System.Windows.Forms.TextBox EYear_Txt;
        private System.Windows.Forms.ComboBox SYear_CBox;
        private System.Windows.Forms.Label label1;
    }
}